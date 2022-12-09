import React, { useState } from "react";
// import React from 'react';
import "../styles/build_workbench.css";
import Header from "../components/Header"

// var cl = new cloudinary.Cloudinary({cloud_name: "dokk84fdh", secure: true});
// cloudinary.uploader().upload(new File("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg"),
//   ObjectUtils.asMap("public_id", "olympic_flag"));
// cloudinary.imageTag('sneaker.png', {crop: "scale", width: 150 }).toHtml();

import { PopoverPicker } from "../components/PopoverPicker";

const flair = {
	addNavBarSizing: {
		width: "25%",
		minHeight: "100%",
	},
	addNavBarColor: {
		backgroundColor: "aquamarine",
	},
	// templateWrapper: {
	// 	padding: "10px",
	// 	backgroundColor: 'blue'
	// },
};

const WRK = () => {
	let codeCompileArr = [];
	const [visibilityNav, setVisibilityNav] = useState(false);

	const [nav, setNav] = useState("Add Navigation Bar");

	const [color, setColor] = useState("#aabbcc");

	const start = () => {
		codeCompileArr = [];
	};

	const addNav = () => {
		if (visibilityNav) {
			setVisibilityNav(false);
			setNav("Add Navigation Bar");
		} else {
			setVisibilityNav(true);
			setNav("Remove Navigation Bar");
		}
	};
	const navDir = () => {
		let navDirVal = document.getElementById("navDir").textContent;
		if (navDirVal === "Right") {
			document.getElementById("navDir").innerHTML = "Left";
		}
		if (navDirVal === "Left") {
			document.getElementById("navDir").innerHTML = "Right";
		}
	};
	const navSubmit = (e) => {
		e.preventDefault();

		// if (!clickedBtn.getAttribute('count'))
		//render object
		let navDirVal = document.getElementById("navDir").textContent;
		let navColor = color;
		let navLinksString = document.getElementById("navLinksString").value;
		let homeTitle = document.getElementById("homeTitle").value;
		let navLinks = navLinksString.split(",");
		let temp = {
			contentTitle: "navbar",
			navColor: navColor,
			homeTitle: homeTitle,
			navlinks: [navLinks],
			navDir: navDirVal,
		};
		codeCompileArr.push(temp);
		console.log(codeCompileArr);
		let renderDiv = document.getElementById("renderDiv");
		renderDiv.innerHTML = "";

		//render page
		let navObj = -1
		for (let i = 0; i < codeCompileArr.length; i++) {
			if (codeCompileArr[i].contentTitle === "navbar") {
				console.log('yes')
				navObj = i;
			}
		}
		if (navObj === -1) {
		} else {
			let navRenderObj = codeCompileArr[navObj];
			let header = document.createElement("div");
			header.setAttribute(
				"style",
				`width: 100%;
				background-color: ${navRenderObj.navColor};`
			);
			let title = document.createElement("div");
			title.setAttribute(
				"style",
				`width: 100%;
				font-size: 40px;
				text-align: center;`
			)
			title.textContent = navRenderObj.homeTitle;
			let nav = document.createElement("ul");
			if (navRenderObj.navDir === 'Left') {
				nav.setAttribute(
					"style",
					`width: 100%;
					display: flex;
					margin-right: 15px;
					justify-content: start;`
				)
			}
			if (navRenderObj.navDir === 'Right') {
				nav.setAttribute(
					"style",
					`width: 100%;
				display: flex;
				margin-right: 15px;
				justify-content: end;`
				)
			}

			let tempLinks = navRenderObj.navlinks[0]
			for (let i = 0; i < tempLinks.length; i++) {
				let navLink = document.createElement("li");
				navLink.setAttribute(
					"style",
					`margin-right: 15px;`)

				navLink.textContent = navRenderObj.navlinks[0][i];
				nav.append(navLink);
			}
			header.append(title);
			header.append(nav);
			renderDiv.appendChild(header);
		}
	};

	return (
		<React.Fragment>
			<Header />
			<div className="container-fluid">
				<div className="row">
					<aside
						id="sidebar"
						className="col-3 d-flex flex-column align-items-center"
					>
						<h2 className="mt-3">Workbench</h2>
						<button
							className="btn btn-success w-100"
							type="button"
							onClick={start}
						>
							Start
						</button>
						<button
							className="btn dropdown-toggle w-100"
							type="button"
							onClick={addNav}
							id="addNavBtn"
						>
							{nav}
						</button>
						{visibilityNav ? (
							<div style={flair.addNavBarColor} className="inner-container">
								<div className="d-flex justify-content-between">
									<label>background color for nav bar</label>
									{<PopoverPicker color={color} onChange={setColor} />}
								</div>
								<label>
									nav bar links (seperate with a comma)
									<input type="text" id="navLinksString"></input>
								</label>
								<label>
									Title of home page
									<input type="text" id="homeTitle"></input>
								</label>
								<button id="navDir" onClick={navDir}>
									Right
								</button>

								<button
									className="btn btn-primary m-3"
									id="navBtn"
									onClick={navSubmit}
								>
									Submit Nav Settings
								</button>
							</div>
						) : (
							<div></div>
						)}
						<button className="btn dropdown-toggle w-100" type="button">
							Dropdown button
						</button>
					</aside>
					<main
						className="col-9 wrk-concept-container">
						<div id="renderDiv"></div>
					</main>
				</div>
			</div>
		</React.Fragment>

		// <div >
		// 	<h1>Build Workbench Page</h1>
		// 	<div className="d-flex">
		// 		<div style={flair.addNavBarSizing} className="inner-container">
		// 			<button className="startBtn" onClick={start}>
		// 				start
		// 			</button>
		// 			<button onClick={addNav} id="addNavBtn">
		// 				{nav}
		// 			</button>
		// 			{visibilityNav ? (
		// 				<div style={flair.addNavBarColor} className="inner-container">
		// 					<label>
		// 						background color for nav bar
		// 						<input type="text" id="navColor"></input>
		// 					</label>
		// 					<label>
		// 						nav bar links followed by , to separate them
		// 						<input type="text" id="navLinksString"></input>
		// 					</label>
		// 					<label>
		// 						Title of home page
		// 						<input type="text" id="homeTitle"></input>
		// 					</label>
		// 					<button id="navBtn" onClick={navSubmit}>
		// 						submit nav settings
		// 					</button>

		// 				</div>
		// 			) : (
		// 				<div></div>
		// 			)}

		// 		</div>
		// 		<div style={flair.templateWrapper} className="wrk-concept-container">
		// 			<div id="renderDiv"></div>
		// 		</div>
		// 	</div>

		// </div>
	);
};

export default WRK;