using System.Threading.Tasks;
using AqSavior.Models.TokenAuth;
using AqSavior.Web.Controllers;
using Shouldly;
using Xunit;

namespace AqSavior.Web.Tests.Controllers
{
    public class HomeController_Tests: AqSaviorWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}