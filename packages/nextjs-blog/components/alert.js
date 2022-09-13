import styles from './alert.module.scss'
import cn from 'classnames'

export default function Alert(props) {
  const { children, type} = props
  console.log(styles)
  return (
    <div
      className={cn({
        [styles.success]: type === 'success',
        [styles.error]: type === 'error'
      })}
    >
      { children }
      <h2 className={styles.xl}>tisou1</h2>
    </div>
  )
}
