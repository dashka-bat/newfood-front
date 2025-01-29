import { Logo } from "./logo";
import "./style.css";
export function Footer() {
  return (
    <div>
      <div className="bg-[#18181B] h-[755px] w-screen]">
        <div className="bg-[#18181B] h-[60px] w-screen">
          <div className="bg-[#EF4444]">
            <div className="w-full h-[92px] bg-[#EF4444] overflow-hidden relative mt-[60px]">
              <div className="text-animation-infinite-scroll absolute whitespace-nowrap  text-white text-xl pt-8">
                <span className="mx-24">Fresh fast delivered </span>
                <span className="mx-24">Fresh fast delivered </span>
                <span className="mx-24">Fresh fast delivered </span>
                <span className="mx-24">Fresh fast delivered </span>
                <span className="mx-24">Fresh fast delivered </span>
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-5 gap-5 mt-20 ml-16">
            <Logo />
            <div>
              <div className="text-gray-500">NOMNOM</div>
              <div className="text-white">
                <p>Home</p>
                <p>Contact us</p>
                <p>Delivery zone</p>
              </div>
            </div>
            <div>
              <div className="text-gray-500"> MENU</div>
              <div className="text-white">
                {" "}
                <p>Appetizers</p>
                <p>Salads </p>
                <p>Pizzas</p>
                <p>Lunch favorites</p>
                <p> Main dishes</p>
              </div>
            </div>
            <div>
              <div className="text-white mt-5">
                {" "}
                <p>Side dish </p>
                <p>Brunch </p>
                <p>Desserts</p>
                <p> Beverages</p>
                <p> Fish & Sea foods </p>
              </div>
            </div>
            <div>
              <div className="text-gray-500"> FOLLOW US</div>

              <div className="flex gap-5">
                <img src="Facebook.png" alt="" />
                <img src="Instagram.png" alt="" />
              </div>
            </div>
          </div>
          <div className="border-t-[1px] border-t-gray-500 h-20 mt-[104px]  ml-16 text-gray-500">
            <div className="mt-16 flex gap-32">
              <p>Copy right 2024 © Nomnom LLC</p>
              <p>Privacy policy </p>
              <p>Terms and conditoin</p>
              <p>Cookie policy</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
