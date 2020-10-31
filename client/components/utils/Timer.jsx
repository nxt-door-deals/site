import React, {useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassHalf,
  faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";

// props passed down from the otp form
const Timer = (props) => {
    var timer

    useEffect(() => {
        timer = setInterval(() => {
            if(props.seconds > 0){
                props.setSeconds(props.seconds-1)
            }

            if (props.seconds === 0){
                if (props.minutes === 0) {
                    clearInterval(timer)
                } else {
                        props.setMinutes(props.minutes-1)
                        props.setSeconds(59)
                    }
                }
            }, 1000)

        return () => clearInterval(timer)
    }, [props.seconds])

    return (
        <div className="font-axiforma text-xs text-red-800">
            { props.minutes === 0 && props.seconds === 0 ?
             <p><FontAwesomeIcon icon={faHourglassEnd} /> Time's up! Please regenerate the OTP</p> : <p><FontAwesomeIcon icon={faHourglassHalf} /> Time remaining: {props.minutes}:{props.seconds < 10 ? `0${props.seconds}` : props.seconds}</p>}
        </div>
    )
}

export default Timer
