import SearchBar from "../../components/searchBar";
import CartBox from "../../components/cartBox";
import { useService } from "../../hooks/serviceHook";
import { BOOK } from "../../services/api.services";
import { useEffect, useState } from "react";
import { NoRecordFound } from "../../components/no-record-found";
import CustomModal from "../../components/modal";
import Auth from "../../components/auth";
import { CustomModalStyle } from "../../components/modal/style";
import { AuthUser } from "../../services/auth-user";
import Button from "@mui/material/Button";
import { MODAL_TYPE, ROLE } from "../../constants/enum";
import { AddBookForm } from "../../components/modal-form/add-books";
import { modalElement } from "../../constants/constant";

const dummyBooks = [
  {
    id: 1,
    title: "Atomic Habits",
    publishYear: 2018,
    author: "James Clear",
    price: 150,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "Nice to read this book. It is a full-length book and will be great to read.",
  },
  {
    id: 2,
    title: "The Power of Habit",
    publishYear: 2012,
    author: "Charles Duhigg",
    price: 180,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "An insightful book on the science of habits and how to change them.",
  },
  {
    id: 3,
    title: "Educated",
    publishYear: 2018,
    author: "Tara Westover",
    price: 220,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A memoir about a woman who grows up in a strict and abusive household in rural Idaho and eventually escapes to learn about the wider world through education.",
  },
  {
    id: 4,
    title: "Becoming",
    publishYear: 2018,
    author: "Michelle Obama",
    price: 250,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A deeply personal memoir by the former First Lady of the United States.",
  },
  {
    id: 5,
    title: "The Subtle Art of Not Giving a F*ck",
    publishYear: 2016,
    author: "Mark Manson",
    price: 200,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A self-help book that emphasizes the importance of focusing on what truly matters.",
  },
  {
    id: 6,
    title: "Sapiens",
    publishYear: 2014,
    author: "Yuval Noah Harari",
    price: 270,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A brief history of humankind, exploring how Homo sapiens came to dominate the world.",
  },
  {
    id: 7,
    title: "Dune",
    publishYear: 1965,
    author: "Frank Herbert",
    price: 300,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A science fiction epic set in a distant future amidst a huge interstellar empire.",
  },
  {
    id: 8,
    title: "The Alchemist",
    publishYear: 1988,
    author: "Paulo Coelho",
    price: 130,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A novel about a shepherd's journey to discover his personal legend.",
  },
  {
    id: 9,
    title: "1984",
    publishYear: 1949,
    author: "George Orwell",
    price: 170,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A dystopian novel set in a totalitarian society ruled by Big Brother.",
  },
  {
    id: 10,
    title: "The Great Gatsby",
    publishYear: 1925,
    author: "F. Scott Fitzgerald",
    price: 200,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A classic novel of the Jazz Age, exploring themes of wealth, love, and the American Dream.",
  },
  {
    id: 11,
    title: "To Kill a Mockingbird",
    publishYear: 1960,
    author: "Harper Lee",
    price: 220,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A novel that deals with serious issues such as racial injustice and moral growth.",
  },
  {
    id: 12,
    title: "The Catcher in the Rye",
    publishYear: 1951,
    author: "J.D. Salinger",
    price: 190,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A story about a teenage boy's journey through New York City and his struggle with adolescence.",
  },
  {
    id: 13,
    title: "Brave New World",
    publishYear: 1932,
    author: "Aldous Huxley",
    price: 210,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A dystopian novel that explores a future society characterized by extreme technological advancements and control.",
  },
  {
    id: 14,
    title: "Little Fires Everywhere",
    publishYear: 2017,
    author: "Celeste Ng",
    price: 230,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A compelling story about family secrets and the conflicts between social classes.",
  },
  {
    id: 15,
    title: "Where the Crawdads Sing",
    publishYear: 2018,
    author: "Delia Owens",
    price: 240,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A mystery and coming-of-age novel set in the marshes of North Carolina.",
  },
  {
    id: 16,
    title: "The Silent Patient",
    publishYear: 2019,
    author: "Alex Michaelides",
    price: 260,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A psychological thriller about a woman who shoots her husband and then stops speaking.",
  },
  {
    id: 17,
    title: "The Goldfinch",
    publishYear: 2013,
    author: "Donna Tartt",
    price: 280,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A novel about a young boy whose life is turned upside down after a tragedy.",
  },
  {
    id: 18,
    title: "The Night Circus",
    publishYear: 2011,
    author: "Erin Morgenstern",
    price: 190,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A fantastical tale of a magical competition between two young illusionists.",
  },
  {
    id: 19,
    title: "The Woman in the Window",
    publishYear: 2018,
    author: "A.J. Finn",
    price: 210,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A suspenseful thriller about an agoraphobic woman who believes she has witnessed a crime.",
  },
  {
    id: 20,
    title: "The Outsider",
    publishYear: 2018,
    author: "Stephen King",
    price: 300,
    url: "https://images.meesho.com/images/products/224396373/voihu_512.webp",
    description:
      "A chilling thriller about a detective investigating a gruesome murder that seems to defy explanation.",
  },
];

export const Home = () => {
  const { getToken, getUser } = AuthUser();
  const user = getUser();
  const userType = user?.userType || ROLE.GUEST;
  const [resposeData, setresponseData] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [modalType, setModalType] = useState<any>(
    modalElement[MODAL_TYPE.AUTH]
  );

  const style = new CustomModalStyle(modalType.style);

  const { fetchData: getAllBooksService }: any = useService(
    async () =>
      await BOOK.fetchAllBooks(query ? { searchBy: query } : null).then(
        (data) => setresponseData(data.data)
      )
  );

  const handleSearch = (query: string) => {
    setQuery(query);
  };

  const handleAddToCart = () => {
    if (!getToken()) {
      setOpen(true);
    }
  };

  const handleAddBooks = (modalType: MODAL_TYPE) => {
    setModalType(modalElement[modalType]);
    setOpen(true);
  };

  const handleUpdate = () => {
    getAllBooksService();
    setOpen(false);
  };

  useEffect(() => {
    getAllBooksService();
  }, [query]);

  return (
    <div className="pb-10">
      <div className="flex justify-center py-10 space-x-12">
        <SearchBar onSearch={handleSearch} style={"w-[50%]"} />
        {userType === ROLE.SELLER && (
          <Button
            className="h-[3rem]"
            variant="contained"
            color="primary"
            onClick={() => handleAddBooks(MODAL_TYPE.ADD_BOOK)}
          >
            + Add Books
          </Button>
        )}
      </div>
      <div className="w-full">
        {resposeData?.books?.length ? (
          <div className="w-[60%] mx-auto gap-10 grid grid-cols-4">
            {resposeData?.books?.map((item: any) => (
              <CartBox
                key={item.id}
                data={item}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <NoRecordFound iconHight="10rem" iconWidth="10rem" />
        )}
      </div>
      <CustomModal
        style={style}
        title={modalType.name}
        open={open}
        handleClose={() => setOpen(false)}
      >
        {MODAL_TYPE.AUTH === modalType.type ? (
          <Auth setOpen={setOpen} />
        ) : (
          <AddBookForm handleUpdate={handleUpdate} />
        )}
      </CustomModal>
    </div>
  );
};
