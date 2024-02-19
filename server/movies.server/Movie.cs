namespace movies.server
{
    public class Movie
    {
        public string id { get; set; }
        public string title { get; set; } = string.Empty;
        public string year { get; set; }
        public string img { get; set; }
        public string synopsis { get; set; } = string.Empty;
    }
}
