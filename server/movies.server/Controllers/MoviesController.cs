using Microsoft.AspNetCore.Mvc;
using movies.server;
using System.Text.Json;

[ApiController]
[Route("[controller]")]
public class MoviesController : ControllerBase
{
    private StorageService storageService;

    public MoviesController()
    {
        storageService = new StorageService();
    }

    [HttpGet]
    public async Task<IEnumerable<Movie>> Get()
    {
        string json = await storageService.GetJsonFileAsync("movies", "db.json");
        return JsonSerializer.Deserialize<IEnumerable<Movie>>(json);
    }
}