import './box.scss'
import PropTypes from 'prop-types'


const Box = ({ name, content, classNames, handleClick }) => {
    return (
        <div className={`box ${classNames.join(' ')}`} onClick={() => handleClick(name)}>
            {content && <span>{content}</span>}
        </div>
    )
}
Box.propTypes = {
    name: PropTypes.string,
    content: PropTypes.string,
    classNames: PropTypes.string,
    handleClick: PropTypes.function
}

export default Box