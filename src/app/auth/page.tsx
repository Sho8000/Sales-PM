import UserLogin from "../(components)/Login/Login";

export default function Login() {

  return (
    <section className={`relative w-full h-[80vh] bg-[#fdfdfd]`}>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-60%]">
        <UserLogin/>
      </div>
    </section>
  )
}