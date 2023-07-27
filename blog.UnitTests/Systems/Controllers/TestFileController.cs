using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using netcore_blog.Controllers;
using netcore_blog.Models;

namespace blog.UnitTests.Systems.Controllers;

public class TestFileController
{
    [Fact]
    public void Get_OnSuccess_ReturnsStatusCode200()
    {
        var mockEnvironment = new Mock<IWebHostEnvironment>();
        mockEnvironment.Setup(m => m.WebRootPath).Returns(Environment.CurrentDirectory);

        var fileController = new FileController(mockEnvironment.Object);

        var mockFile = new Mock<IFormFile>();
        var sourceImg = File.OpenRead(@"img1.jpg");
        var ms = new MemoryStream();
        var writer = new StreamWriter(ms);
        writer.Write(sourceImg);
        writer.Flush();
        ms.Position = 0;
        var fileName = "test_img.jpg";
        mockFile.Setup(f => f.FileName).Returns(fileName).Verifiable();
        mockFile.Setup(_ => _.CopyToAsync(It.IsAny<Stream>(), It.IsAny<CancellationToken>()))
            .Returns((Stream stream, CancellationToken token) => ms.CopyToAsync(stream))
            .Verifiable();

        var mockFileObject = mockFile.Object;
        var fm = new FileModel();
        fm.FileName = fileName;
        fm.FormFile = mockFileObject;

        var result = (StatusCodeResult) fileController.Post(fm);

        result.StatusCode.Should().Be(201);
    }

}