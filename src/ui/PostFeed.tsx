import { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import Button from "./Button";
import Typography from "./Typography";
import { api } from "../api/api"; // ajusta o caminho conforme teu projeto

interface Post {
  id: number;
  user: string;
  content: string;
  image?: string;
  likes: number;
  likedBy: string[];
  comments: Comment[];
}

interface Comment {
  id: number;
  user: string;
  text: string;
}

export default function PostFeed() {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carregar posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Erro ao carregar posts:", err);
      }
    };
    fetchPosts();
  }, []);

  // Upload de imagem
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("A imagem deve ter menos de 5MB");
      return;
    }

    setImage(file);
  };

  // Criar post
  const handlePost = async () => {
    if (!content.trim() || !user) return;

    try {
      const res = await api.post("/posts", { content, image });
      setPosts([res.data, ...posts]);
      setContent("");
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Erro ao criar post:", err);
    }
  };

  // Curtir post
  const handleLike = async (postId: number) => {
  if (!user) return;

  try {
    await api.post(`/posts/${postId}/like`); // não precisa de res se não vai usar
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, likes: p.likes + 1, likedBy: [...p.likedBy, user] }
          : p
      )
    );
  } catch (err) {
    console.error("Erro ao curtir post:", err);
  }
};


  // Comentar post
  const handleComment = (postId: number, text: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, { id: Date.now(), user: user || "Anônimo", text }] }
          : p
      )
    );
  };

  if (!user) {
    return (
      <div className="text-center p-8 bg-bg rounded-lg">
        <Typography as="h2" variant="sans" size="xl" className="text-white">
          Faça login para postar algo na comunidade
        </Typography>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <div className="bg-white text-black p-4 rounded-xl shadow-md">
        <textarea
          className="w-full border rounded-md p-2 outline-none resize-none"
          placeholder="Compartilhe algo com a comunidade..."
          value={content}
          maxLength={300}
          onChange={(e) => setContent(e.target.value)}
        />
        {image && <p className="text-sm mt-1">Imagem selecionada: {image.name}</p>}
        <div className="flex justify-between items-center mt-3">
          <div className="flex gap-3">
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
            <Button variant="feed" onClick={() => fileInputRef.current?.click()}>
              Anexar Imagem
            </Button>
          </div>
          <Button variant="primary" onClick={handlePost} disabled={!content.trim()}>
            Postar
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {posts.length === 0 && (
          <Typography as="p" variant="sans" size="lg" className="text-center text-gray-500">
            Nenhum post ainda. Seja o primeiro!
          </Typography>
        )}

        {posts.map((post) => (
          <div key={post.id} className="bg-white text-black p-4 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-2">
              <Typography as="h3" variant="sans" size="lg" className="font-semibold">
                {post.user}
              </Typography>
              <Button
                onClick={() => handleLike(post.id)}
                variant="feed"
                disabled={post.likedBy.includes(user!)}
              >
                ❤️ {post.likes}
              </Button>
            </div>
            <Typography as="p" variant="sans" size="base">
              {post.content}
            </Typography>
            {post.image && (
              <img src={post.image} alt="post" className="mt-2 rounded-md max-h-72 object-cover" />
            )}

            <div className="mt-3">
              <CommentSection postId={post.id} comments={post.comments} onComment={handleComment} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommentSection({
  postId,
  comments,
  onComment,
}: {
  postId: number;
  comments: Comment[];
  onComment: (id: number, text: string) => void;
}) {
  const [text, setText] = useState("");
  return (
    <div className="mt-2">
      <div className="space-y-1">
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-100 rounded-md p-2 text-sm">
            <strong>{c.user}:</strong> {c.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2 gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Comente algo..."
          className="flex-1 border rounded-md p-2 outline-none text-sm"
        />
        <Button
          variant="feed"
          onClick={() => {
            if (text.trim()) {
              onComment(postId, text);
              setText("");
            }
          }}
        >
          Enviar
        </Button>
      </div>
    </div>
  );
}
