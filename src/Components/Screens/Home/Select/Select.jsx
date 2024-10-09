import styles from './Select.module.css'

function Select({sort, setSort}) {


   return (
    <select className={styles.select} value={sort} onChange={event =>setSort(event.target.value)} >
            <option value="sort">Без сортировки</option>
            <option value="new">Сначала новые</option>
            <option value="old">Сначала старые</option>
    </select>
   ) 
}
export default Select 