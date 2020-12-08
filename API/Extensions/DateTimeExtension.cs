using System;

namespace API.Extensions
{
    public static class DateTimeExtension
    {
        public static int CaculateAge(this DateTime dob)
        {
            var today = DateTime.Today;
            var age = today.Year - dob.Year;
            if (dob.Date > today.AddYears(-age)) age--;
            return age;
        }
    }
}