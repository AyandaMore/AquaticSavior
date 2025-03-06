using AqSavior.Debugging;

namespace AqSavior
{
    public class AqSaviorConsts
    {
        public const string LocalizationSourceName = "AqSavior";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "de01ea4a46cf417890babc05c7327cfe";
    }
}
