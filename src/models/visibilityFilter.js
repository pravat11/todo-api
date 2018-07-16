import bookshelf from '../db';

const TABLE_NAME = 'visibility_filters';

const VisibilityFilters = bookshelf.Model.extend({
  tableName: TABLE_NAME
});

export default VisibilityFilters;
