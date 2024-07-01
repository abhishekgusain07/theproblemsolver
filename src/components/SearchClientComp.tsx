"use client"
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { Post } from "@/lib/types/types";
import { useEffect, useState } from "react";
import { getAllPost } from "./dbFunctions/Posts";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
  
const SearchClientComp = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [posts, setPosts] = useState<Post[]>([])
    const router = useRouter()
    useEffect(() => {
        const down = (e: KeyboardEvent) => {
          if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
            e.preventDefault()
            setOpen((open) => !open)
          }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
      }, [])
      useEffect(() => {
        const getTotalPosts = async() => {
            const allPosts: Post[] = await getAllPost()
            setPosts(allPosts)
        }
        getTotalPosts()
      }, [])
      const handleClick = (postId: number) => {
        console.log(`inside`)
        router.push(`/posts/${postId}`)
      }
    return (
        <div>
            <h1 className="text-muted-foreground">Press ⌘+k to open search</h1>
            <CommandDialog open={open} onOpenChange={setOpen}>
            <Command className="rounded-lg border shadow-md">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Logs">
                {
                    posts.map((post) => (
                        <CommandItem key={post.id} >
                            <p onClick={() => handleClick(post.id)}>{post.title}</p>
                        </CommandItem>
                    ))
                }
                </CommandGroup>
                <CommandSeparator />
            </CommandList>
        </Command>
        </CommandDialog>
        </div>
    )
}
export default SearchClientComp;