

export default function CreateButton(){
    return (
        <div className="flex justify-center items-center px-4 py-2 border-2 border-text bg-text text-bg rounded-full h-[8vh]">
            <button className="hidden md:block">
                + Create
            </button>
            <button className="block md:hidden">
                Create
            </button>
        </div>
    )
}