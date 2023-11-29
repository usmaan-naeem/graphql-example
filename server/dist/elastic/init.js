import esClient from "./client.js";
async function createIndex(indexName) {
    const indexExists = await esClient.indices.exists({
        index: indexName,
    });
    if (!indexExists) {
        await esClient.indices.create({
            index: indexName,
            settings: {
            /* ... optional settings ... */
            },
            mappings: {
                properties: {
                    title: { type: "text" },
                    content: { type: "text" },
                    userId: { type: "keyword" },
                },
            },
        });
        console.log(`Index ${indexName} created`);
    }
    else {
        console.log(`Index ${indexName} already exists`);
    }
}
export default createIndex;
