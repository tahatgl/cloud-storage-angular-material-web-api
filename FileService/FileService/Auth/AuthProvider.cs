using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using FileService.Controllers;
using Microsoft.Owin.Security;

namespace FileService.Auth
{
    public class AuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            //context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            var userController = new UserController();
            var user = userController.login(context.UserName, context.Password);
            List<string> auth = new List<string>();

            if (user != null)
            {
                string authentic = "";
                if (user.Role == 1)
                {
                    authentic = "Admin";
                }
                else
                {
                    authentic = "Normal";
                }
                auth.Add(authentic);

                var identity = new ClaimsIdentity(context.Options.AuthenticationType);

                identity.AddClaim(new Claim(ClaimTypes.Name, context.UserName));
                identity.AddClaim(new Claim(ClaimTypes.Role, authentic));
                identity.AddClaim(new Claim(ClaimTypes.PrimarySid, user.ID.ToString()));

                AuthenticationProperties properties = new AuthenticationProperties(new Dictionary<string, string>
                {
                    { "ID", user.ID.ToString() },
                    { "Name", user.Name },
                    //{ "Auth", Newtonsoft.Json.JsonConvert.SerializeObject(auth) },
                    { "Role", user.Role.ToString() }
                });

                AuthenticationTicket ticket = new AuthenticationTicket(identity, properties);

                context.Validated(ticket);
            }
            else
            {
                context.SetError("Geçersiz istek!", "Hatalı kullanıcı bilgisi");
            }
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }
    }
}