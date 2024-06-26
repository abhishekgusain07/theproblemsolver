import ExternalLink from "@/components/ExternalLink";

export default function Home() {
  return (
    <main className="text-center pt-32 px-5">
      <h1 className="text-4xl md:text-5xl font-bold mb-5 h-full"> theProblemSolver </h1>
      <p className="max-w-[750px] mx-auto leading-8">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam hic eaque nobis earum ipsam assumenda, minima a culpa, officiis commodi deleniti enim pariatur quisquam odio quae saepe! Pariatur, ipsum cumque.
      </p>
      <div className="fixed bottom-20 inset-x-0 flex justify-center items-center gap-x-2">
        <ExternalLink 
        href="https://github.com/abhishekgusain07"
        imagePath="/github.svg" 
        altText="github icon" />
        <ExternalLink 
        href="https://instagram.com/abhishek_gusain_07" imagePath = "/insta.svg" 
        altText="insta icon"/>
      </div>
    </main>
  );
}
