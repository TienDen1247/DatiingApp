using System.Security.Claims;

namespace API.Extensions
{
    public static class ClaimsPrincipleExtensions
    {
        public static string GetUsername(this ClaimsPrincipal claim)
        {
            return claim.FindFirst(ClaimTypes.Name)?.Value;
        }

        public static int GetUserId(this ClaimsPrincipal claim)
        {
            return int.Parse(claim.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }
    }
}