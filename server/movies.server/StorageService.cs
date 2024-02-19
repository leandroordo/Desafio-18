using Azure.Storage.Blobs;


public class StorageService
{
    private string connectionString = "DefaultEndpointsProtocol=https;AccountName=leandroordonez;AccountKey=MISA/di2TPmMerFMESJ3KjEQHgUfFbBSA3MXmvsiRhQlrA2hyLyMVi+/CwB89aFRSGc9IcMdPcMA+ASt3TNqFQ==;EndpointSuffix=core.windows.net";
    private BlobServiceClient blobServiceClient;

    public StorageService()
    {
        blobServiceClient = new BlobServiceClient(connectionString);
    }

    public async Task<string> GetJsonFileAsync(string containerName, string blobName)
    {
        var containerClient = blobServiceClient.GetBlobContainerClient(containerName);
        var blobClient = containerClient.GetBlobClient(blobName);

        using (var memoryStream = new MemoryStream())
        {
            await blobClient.DownloadToAsync(memoryStream);
            memoryStream.Position = 0;
            using (var streamReader = new StreamReader(memoryStream))
            {
                return await streamReader.ReadToEndAsync();
            }
        }
    }
}