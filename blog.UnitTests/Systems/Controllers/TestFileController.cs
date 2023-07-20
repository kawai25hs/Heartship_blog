using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Moq;
using netcore_blog.Controllers;

namespace blog.UnitTests.Systems.Controllers;

public class TestFileController
{
    [Fact]
    public void Get_OnSuccess_ReturnsStatusCode200()
    {
        var mockEnvironment = new Mock<IWebHostEnvironment>();
            mockEnvironment
        .Setup(m => m.EnvironmentName)
        .Returns("Hosting:UnitTestEnvironment");
        var fileController = new FileController(mockEnvironment.Object);

        var result = (OkObjectResult) fileController.Get();

        result.StatusCode.Should().Be(200);
    }

}