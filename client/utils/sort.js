import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortNumericDownAlt,
  faSortNumericDown,
  faSortAmountDownAlt,
  faSortAmountDown,
  faSortAlphaDown,
  faSortAlphaDownAlt,
} from "@fortawesome/free-solid-svg-icons";

const priceAsc = (
  <span className="flex items-center text-xs">
    <FontAwesomeIcon icon={faSortNumericDown} className="text-xl" />
    &nbsp;Price (low - high)
  </span>
);

const priceDesc = (
  <span className="flex items-center text-xs">
    <FontAwesomeIcon icon={faSortNumericDownAlt} className="text-xl" />
    &nbsp;Price (high - low)
  </span>
);

const createdAsc = (
  <span className="flex items-center text-xs">
    <FontAwesomeIcon icon={faSortAmountDown} className="text-xl" />
    &nbsp;Date (oldest first)
  </span>
);

const createdDesc = (
  <span className="flex items-center text-xs">
    <FontAwesomeIcon icon={faSortAmountDownAlt} className="text-xl" />
    &nbsp;Date (recent first)
  </span>
);

const giveawayAsc = (
  <span className="flex items-center text-xs">
    <FontAwesomeIcon icon={faSortAlphaDown} className="text-xl" />
    &nbsp;Giveaways (oldest first)
  </span>
);

const giveawayDesc = (
  <span className="flex items-center text-xs">
    <FontAwesomeIcon icon={faSortAlphaDownAlt} className="text-xl" />
    &nbsp;Giveaways (recent first)
  </span>
);

const sortOptions = [
  {
    value: "Price ascending",
    label: priceAsc,
  },
  {
    value: "Price descending",
    label: priceDesc,
  },
  {
    value: "Date posted ascending",
    label: createdAsc,
  },
  {
    value: "Date posted descending",
    label: createdDesc,
  },
  {
    value: "Giveaway ascending",
    label: giveawayAsc,
  },
  {
    value: "Giveaway descending",
    label: giveawayDesc,
  },
];

export default sortOptions;
