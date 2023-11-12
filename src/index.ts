import './sass/style.scss';
import Table from './ts/table';
import generateCodeList from './ts/code-list';

generateCodeList(20, 'code-css');
generateCodeList(20, 'code-html');

const table = new Table();
table.init();
