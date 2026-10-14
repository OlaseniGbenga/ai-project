import Image from "next/image";

interface AvatarProps {
  name?: string;
  isReturningUser?: boolean;
}

function Avatar({ name = "there", isReturningUser = false }: AvatarProps) {
  return (
    <div className="mt-6 flex items-center gap-2">
      <Image
        width={30}
        height={30}
        src="/memoji.png"
        alt="Learner avatar"
      />
      <p className="font-serif text-[18px] leading-7 text-[#082a35]">
        {isReturningUser ? "Welcome Back" : "Welcome"}, {name}!
      </p>
      <Image
        width={20}
        height={20}
        src="/verify.svg"
        alt="Verified account"
      />
    </div>
  );
}

export default Avatar;
