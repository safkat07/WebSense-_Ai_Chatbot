import { ragChat } from "@/lib/rag-chat";
import { redis } from "@/lib/redis";

interface PageProps {
    params: {
        url: string | string[] | undefined;
    };
}

const reconstructUrl = ({ url }: { url: string[] }) => {
    const decodedComponents = url.map((component) => {
        return decodeURIComponent(component);
    });
    return decodedComponents.join("/");
};

const page = async ({ params }: PageProps) => {
    const urlParam = params.url;


    if (!urlParam || (Array.isArray(urlParam) && urlParam.length === 0)) {
        throw new Error("Invalid URL parameter");
    }

    const reconstructedUrl = reconstructUrl({
        url: Array.isArray(urlParam) ? urlParam : [urlParam]
    });
    const isAlreadyIndexed = await redis.sismember(
        "indexed-urls", reconstructedUrl
    )

    if (!isAlreadyIndexed) {
        try {
            await ragChat.context.add({
                type: "html",
                source: reconstructedUrl,
                config: { chunkOverlap: 50, chunkSize: 200 }
            });
        } catch (error) {
            console.error("Error adding context to ragChat:", error);
            return <p>Error occurred while processing your request.</p>;
        }

        await redis.sadd("indexed-urls", reconstructedUrl)
    }

    return (
        <p>hello</p>
    );
};

export default page;
