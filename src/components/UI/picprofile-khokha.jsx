

export default function picprofile() {
  return (
  <div className="flex gap-2 items-center">
    <div className="relative w-[60px] h-[60px] border-2 border-light rounded-full">
              <img src="/images/of-2.png" alt="Profile" className="w-full h-full object-cover rounded-full"
                  />
    </div>
    <div className="font-semibold text-primary">
            <div>Maren Bergson</div>
            <div className="bg-b50 px-1 py-0.5 w-fit rounded-[4px] text-xs">
              Pro
            </div>
          </div>
  </div>
    
  );
}