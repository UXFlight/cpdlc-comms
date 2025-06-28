export default function Input() {
  return (
    <div className="flex justify-center w-full">
      <textarea
        placeholder="Write your message here"
        className="w-full min-h-[40px] p-3 rounded-md border border-gray-500 bg-[#1e1e1e] text-white placeholder-gray-400 
                resize-y overflow-auto focus:outline-none focus:ring-1 focus:ring-gray-400"
      />
    </div>
  );
}
