import Link from "next/link";

const HomePage = () => {
    return(
        <div className="text-2xl"> 
          <h1 className="text-3xl">Welcome</h1>
          <Link href='/properties'>Go ToProperties</Link>
        </div>)
}

export default HomePage;