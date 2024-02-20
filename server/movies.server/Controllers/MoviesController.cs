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

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] Movie newMovie)
    {
        string json = await storageService.GetJsonFileAsync("movies", "db.json");
        var movies = JsonSerializer.Deserialize<IEnumerable<Movie>>(json).ToList();

        newMovie.id = movies.Count.ToString();

        movies.Add(newMovie);

        using (var memoryStream = new MemoryStream())
        {
            
            await storageService.PutJsonFileAsync("movies", "db.json", movies);

        }
        return Ok(newMovie);
    }
}