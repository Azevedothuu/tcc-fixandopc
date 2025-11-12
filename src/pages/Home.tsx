import BaseLayout from "../ui/BaseLayout";
import Typography from "../ui/Typography";
import PostFeed from "../ui/PostFeed";

function Home() {
  return (
    <BaseLayout>
      <div className="flex flex-col items-center gap-6">
        <div className="flex justify-center items-center bg-bg w-[600px] h-[100px] rounded-lg mb-7">
          <Typography as="h1" variant="display" size="5xl">
            Comunidade
          </Typography>
        </div>

        <PostFeed />
      </div>
    </BaseLayout>
  );
}

export default Home;
