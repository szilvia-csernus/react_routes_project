import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, asc) => {
  return quotes.sort((quoteA, quoteB) => {
    if (asc) {
      return quoteA.id < quoteB.id ? -1 : 1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  //URLSearchParams is a default JS class
  const queryParams = new URLSearchParams(location.search);

  const isSortTypeAscending = queryParams.get("sort") === "asc";
  const sortedQuotes = sortQuotes(props.quotes, isSortTypeAscending);

  const changesortingHandler = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isSortTypeAscending ? "desc" : "asc"}`,
    });
  };
  
  return (
    <>
      <div className={classes.sorting}>
        <button onClick={changesortingHandler}>
          Sort {isSortTypeAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </>
  );
};

export default QuoteList;
