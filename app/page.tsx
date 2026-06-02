import Image from "next/image";
import logo from "./templogo.webp";

function Home() {
  return <div>
    <h1>Welcome to this Demo Site</h1>
    <p>Welcome to this page for selling products!</p>
    <Image src={logo} alt="Temp Logo" width={600} height={400} />
  </div>;
}

export default Home;
