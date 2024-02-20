using Azure.Storage.Blobs;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using movies.server;
using System.ComponentModel;
using System.IO;
using System.Text.Json;


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
    public async Task PutJsonFileAsync(string containerName, string blobName, List<Movie> Movies)
    {
        CloudStorageAccount storageAccount = CloudStorageAccount.Parse(connectionString);
        CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
        CloudBlobContainer container = blobClient.GetContainerReference(containerName);
        CloudBlockBlob blockBlob = container.GetBlockBlobReference(blobName);

        using (var memoryStream = new MemoryStream())
        {
            var newJson = JsonSerializer.Serialize<IEnumerable<Movie>>(Movies);
            byte[] byteArray = System.Text.Encoding.ASCII.GetBytes(newJson);
            memoryStream.Write(byteArray, 0, byteArray.Length);
            memoryStream.Position = 0;
            await blockBlob.UploadFromStreamAsync(memoryStream);
        }
    }
}