export default function CreateButton() {
  return (
    <div className="flex justify-center items-center px-4 py-2 border border-text bg-text text-bg rounded-full h-[6.75vh] md:h-[8vh] hover:border-black/85 hover:bg-black/85 hover:cursor-pointer">
      <button className="hidden md:block">+ Create</button>
      <button className="block md:hidden">Create</button>
    </div>
  );
}
