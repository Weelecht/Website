const provider = new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/92a6fe14cba2459ea5bed67e810c661c");
const ethusdPoolAddress =  "0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640";
const ethusdcContract = new ethers.Contract(ethusdPoolAddress,ethusdcABI,provider);

const etherscanPrefix = "https://etherscan.io/address/";
const tradeHistory = [];

let running = false;
let localEthPrice; 


//getEthPrice();

document.querySelector('button')?.addEventListener('click', async () => {
    running = true;
	console.log('audio is ready')
})

ethusdcContract.on("Swap",(from,to,amount0,amount1)=> {

    if(running != false) {
        const swapInfo = {
            from: from,
            to: to,
            usdc: ethers.utils.formatUnits(amount0,6),
            eth: ethers.utils.formatEther(amount1)
        }
    
        tradeHistory.push(swapInfo);
        console.log(JSON.stringify(swapInfo,null,4));

        createFeedSlot(swapInfo);

        console.log(calculateEthPrice(swapInfo));
    }
  
})


function createShorthand(_address) {
    const formattedAddress = `${_address.slice(0,4)}...${_address.slice(_address.length-4,_address.length)}`;
    return formattedAddress;

} 

function calculateEthPrice(_swapInfo) {
    return _swapInfo.usdc/_swapInfo.eth;
}


function createFeedSlot(_swapInfo) {
    
    _swapInfo.from = createShorthand(_swapInfo.from);
    _swapInfo.to = createShorthand(_swapInfo.to);
    _swapInfo.usdc = Math.round(_swapInfo.usdc,2);

    const pre = document.createElement("pre");
    //const paragraph = document.createElement("p");

    // const paraString = JSON.stringify(_swapInfo,null,4);

    pre.innerHTML = JSON.stringify(_swapInfo,null,4);
    
    const box = document.createElement("div");
    box.appendChild(pre);

    const grid = document.getElementById("feed-grid");
    grid.appendChild(box);


}


// function setup() {
//     createCanvas(windowWidth,windowHeight);
// }


// function draw() {
//     background(255)
    
//     if(running != false) {
     
//     }

//     console.log(tradeHistory.length);

// }

// function getEthPrice() {
//     fetch("https://api.coingecko.com/api/v3/coins/ethereum?tickers=true&market_data=true", {
//         method: "GET",
//         headers: {
//             "accept": "application/json",
//         }
//     }).then((response)=> {
//         response.json()
//             .then((data)=> {
//                 localEthPrice = data.tickers[2].last;
//             })
//     })
        
// } 





// (async()=>{
//     console.log(ethusdcContract);
// })();


