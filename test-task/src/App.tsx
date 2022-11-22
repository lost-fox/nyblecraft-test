import './App.scss';
import { Note } from './components/Note';

function App() {
  const note = {
    id: 1,
    text: 'woqjp oejoq erpqe woqjp oejoq erpqe woqjp oejoq erpqe woqjp oejoq erpqe woqjp oejoq erpqe woqjp oejoq erpqe woqjp oejoq erpqe woqjp oejoq erpqe woqjp oejoq erpqe woqjp oejoq erpqe',
    tags: ['#shop', '#love'],
  };

  return (
    <div className="app-wrapper">
      <h1 className="app-title">Текстовый редактор</h1>
      <div className="app-add-task">
        <textarea
          className="app-add-task__text"
          name="task"
          id="task"
          cols={50}
          rows={5}
        ></textarea>
        <button className="app-add-task__button">Добавить</button>
      </div>
      <div className="app-notes flex">
        <Note value={note} />
      </div>
    </div>
  );
}

export default App;
