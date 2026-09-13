import Image from "next/image";
function Avatar() {
  return (
    <div className="flex items-center gap-2 mt-6 ">
      <Image
        width={30}
        height={30}
        src="/memoji.png"
        alt="AI Assistant"
      />
      <p> Welcome Back, Aniebiet!</p>
      <Image
        width={20}
        height={20}
        src="verify.svg"
        alt="AI Assistant"
      />
    </div>
  );
}

export default Avatar;
