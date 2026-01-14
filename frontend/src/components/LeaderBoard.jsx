import { useEffect } from "react"
import useAppStore from "../store/useAppStore"

const LeaderBoard = () =>{
    const {leaderboard, setLeaderBoard} = useAppStore()
    const updateleaderboard = async () =>{
        try{
            const res = await fetch("https://friendly-telegram-x5v6p759jwq9c99rr-3000.app.github.dev/leaderboard")
            if (!res.ok) throw new Error(res.error)
            const data = await res.json()
            setLeaderBoard(data)
        } catch (err){
            console.error(err)
        }
    }

    useEffect(() => {
            updateleaderboard()
            const interval = setInterval(() => {
                updateleaderboard()
            }, 5500)
            return () => {clearInterval(interval)}
        }, [])
    return(
     <div className="leaderboard">
                <h2>🏆 Топ-10 игроков</h2>
                    <ol>
                        {leaderboard.sort((a, b) => b.clicks - a.clicks).map((el, i) =>(
                        <li key={el.id}>
                            <span className="rank">#{i + 1}</span>
                            <span className="username">{el.email}</span>
                            <span className="score">{el.clicks} кликов</span>
                        </li> 
                        ))}
                    </ol>
                </div>
                )

}

export default LeaderBoard