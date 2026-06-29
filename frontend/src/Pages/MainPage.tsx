import {ButtonG} from '../../components/ButtonG'

const MainPage = () => {
  const users = [
    { id: 1, name: "GreatStack", online: true },
    { id: 2, name: "Ronaldo", online: false },
    { id: 3, name: "Messi", online: true },
    { id: 4, name: "Shrivanshini", online: false },
    { id: 5, name: "abc112", online: false },
    { id: 6, name: "abc1237", online: true },
    { id: 7, name: "Ganesh Prajapat", online: false },
    { id: 8, name: "Krish", online: true },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-5 py-8 overflow-hidden">
      <ButtonG/>
      {/* Background Glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-700/40 to-transparent rounded-full blur-3xl" />

        <div className="absolute left-32 top-64 w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/25 to-transparent rounded-full blur-[140px]" />

        <div className="absolute right-20 bottom-10 w-[350px] h-[250px] bg-gradient-to-bl from-indigo-700/25 to-transparent rounded-full blur-[120px]" />
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl h-[88vh] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden flex">

        {/* Sidebar */}
        <div className="w-[360px] border-r border-white/10 flex flex-col">

          {/* Logo */}
          <div className="flex items-center justify-between px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-xl">
                💬
              </div>

              <h1 className="text-white text-2xl font-semibold">
                Echo
              </h1>

            </div>

            <button className="text-white text-2xl hover:text-indigo-400 transition">
              ⋮
            </button>

          </div>

          {/* Search */}
          <div className="px-5">

            <input
              type="text"
              placeholder="Search User..."
              className="w-full h-11 rounded-full bg-white/5 border border-white/10 px-5 text-white placeholder:text-gray-400 outline-none focus:border-indigo-500"
            />

          </div>

          {/* Users */}
          <div className="flex-1 overflow-y-auto mt-6 px-3 space-y-2">

            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition cursor-pointer"
              >
                <div className="relative">

                  <img
                    src={`https://i.pravatar.cc/150?img=${user.id}`}
                    className="w-12 h-12 rounded-full object-cover"
                    alt={user.name}
                  />

                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#141414] ${
                      user.online ? "bg-green-500" : "bg-gray-500"
                    }`}
                  />

                </div>

                <div>

                  <h2 className="text-white font-medium">
                    {user.name}
                  </h2>

                  <p className="text-sm text-gray-400">
                    {user.online ? "Online" : "Offline"}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Right Chat Section */}
        <div className="flex-1 relative bg-black/20">

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <div className="w-24 h-24 rounded-3xl bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-700/50">

              <span className="text-5xl">💬</span>

            </div>

            <h1 className="mt-8 text-4xl text-white font-semibold">
              Chat anytime,
              <span className="text-indigo-400"> anywhere</span>
            </h1>

            <p className="text-gray-400 mt-4 text-lg">
              Select a conversation to start chatting.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MainPage;