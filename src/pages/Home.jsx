import { useEffect, useState } from "react";
import "./Home.css"

const Home = () => {
	const [location, setLocation] = useState({ lat: "0", lon: "0" });
	const [data, setData] = useState([]);
	const [result, setResult] = useState();


	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${
				location.lat
			}&lon=${location.lon}&appid=${
				import.meta.env.VITE_API_KEY
			}&units=metric`,
		)
			.then((response) => response.json())
			.then((data) => {
				setData(data);
				setResult(
					<section>
						<h2>
							{data.list[0].weather[0].description} in{" "}
							{data.city.name}
						</h2>
						<div>
							<img
								src={`https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`}
								alt=''
							/>
						</div>
						<p>Aktuell {data.list[0].main.temp.toFixed(0)}° C</p>
						<p>
							Windgeschwindigkeit: {data.list[0].wind.speed}{" "}
							km/Std
						</p>
					</section>,
				);
			})
			.catch((err) => console.log(err));
	}, [location]);

	return (
		<main>
			<button
				onClick={() =>
					setLocation({ lat: 53.55416445, lon: 9.9583295 })
				}>
				Hamburg
			</button>
			<button
				onClick={() => setLocation({ lat: 52.520008, lon: 13.404954 })}>
				Berlin
			</button>
			<button
				onClick={() =>
					setLocation({ lat: 50.9820919, lon: 6.7851707 })
				}>
				Köln
			</button>
			<button
				onClick={() =>
					setLocation({ lat: -33.8644775, lon: 150.640926 })
				}>
				Australien
			</button>
			{result}
		</main>
	);
}
 
export default Home;