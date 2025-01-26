import Link from "next/link";

export function Header() {
  return (
    <header className="h-[68px] bg-[#18181B]">
      <div className="flex justify-between">
        <Link href={"/"}>
          <div className="flex">
            <img src="https://res.cloudinary.com/dxkgrtted/image/upload/v1737355853/food-delivery/qj4msjgxnn48cfsyayh1.png"></img>
            <div>
              <div className="flex">
                {" "}
                <div className="text-white text-[20px]">Nom</div>
                <div className="text-red-600 text-[20px]">Nom</div>
              </div>

              <div>
                <div className="text-[12px] text-white">Swift Delivery</div>
              </div>
            </div>

            <div></div>
          </div>
        </Link>

        <input placeholder="search?" className="text-black"></input>
      </div>
    </header>
  );
}
