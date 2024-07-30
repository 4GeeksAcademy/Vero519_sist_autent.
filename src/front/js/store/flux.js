const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			auth:false
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			// login a mi mail

			login: async(email,password) => {
				// getActions().changeColor(0, "green");
				// hacer fetch que envie el email y password para poder loguearme
				try {
					const response= await fetch('https://literate-winner-69rvq6wwwwxq35vwj-3001.app.github.dev/api/login',{
						method:'POST',
						headers:{
							'Content-Type':'application/json'
						},
						body: JSON.stringify({
							"email":email,
							"password":password
						})
					})
					let data = await response.json()
					localStorage.setItem("token",data.access_token)
					setStore({auth:data.logged})
					console.log(data);
					return true
				} catch (error) {
					console.log(error);
					return false
				}

			},	
			logout:() => {
				// console.log("funciona");
				localStorage.removeItem("token");
				setStore({auth:false})
				return true
			},

			record: async(email,password) => {
				// getActions().changeColor(0, "green");
				// hacer fetch que envie el email y password para poder loguearme
				try {
					const response= await fetch('https://literate-winner-69rvq6wwwwxq35vwj-3001.app.github.dev/api/register',{
						method:'POST',
						headers:{
							'Content-Type':'application/json'
						},
						body: JSON.stringify({
							"email":email,
							"password":password
						})
					})
					let data = await response.json()
					console.log(data);
					return true
				} catch (error) {
					console.log(error);
					return false
				}

			},	

		// Traer la informacion del profile de usuario
		getProfile: async() => {
			let token = localStorage.getItem("token");
			try {
				let response= await fetch('https://literate-winner-69rvq6wwwwxq35vwj-3001.app.github.dev/api/private',{
					method:'GET',
					headers:{
						'Content-Type':'application/json',
						'Authorization': `Bearer ${token}`
					},
					
				})
				let data = await response.json()
				console.log(data); // me muestra data en
				// setStore({auth:data.logged})
				return true
			} catch (error) {
				console.log(error);
				return false
			}
		
		},
		validToken:async()=>{
			let token = localStorage.getItem("token");
			try {
				let response= await fetch('https://literate-winner-69rvq6wwwwxq35vwj-3001.app.github.dev/api/valid_token',{
					method:'GET',
					headers:{
						'Content-Type':'application/json',
						'Authorization': `Bearer ${token}`
					},
					
				})
				let data = await response.json()
				console.log(data); // me muestra data en

			} catch (error) {
				console.log(error);
				return false
			}
		},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
