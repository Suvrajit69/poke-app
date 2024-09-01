import Feed from "./components/Feed";

function App() {
  return (
    <section className="w-full flex items-center flex-col ">
      <h1 className="head_text text-center flex flex-col sm:flex-row">
        Discover
        {/* <br className="max-md:hidden" /> */}
        <span className="orange_gradient ml-3 text-center"> Pokemons</span>
      </h1>
      <p className="desc text-center">
        All the Pokémon data you'll ever need in one place, easily accessible
        through a modern free open-source RESTful API.
      </p>
      <Feed />
    </section>
  );
}

export default App;
