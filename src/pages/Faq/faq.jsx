import { MdSearch } from "react-icons/md";
import Sidebar from "../../components/sidebar";
import Topbar from "../../components/topbar";
import "./faq.css";
import { useEffect, useState } from "react";
import { Faqs } from "../../data";
import { NoData } from "../../components/history";

const Faq = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [Faqss, setFaqss] = useState([]);

  useEffect(() => {
    const filter = Faqs.filter((data) => {
      return data.question.toLowerCase() === search.toLowerCase()
        ? data
        : data.question.toLowerCase().includes(search)
        ? data
        : "";
    });

    setFaqss(filter);
  }, [search]);

  console.log(Faqss);
  return (
    <section className="home_one">
      <div className="home_two">
        <div className="home_three">
          <Sidebar setOpenMenu={setOpenMenu} openMenu={openMenu} />
        </div>
        <div className="home_four">
          <Topbar setOpenMenu={setOpenMenu} />
          <div className="home_five reduce_pad">
            <div className="faq_one">
              <div className="faq_two">
                <strong>FAQs</strong>
                <h2>Ask us anything</h2>
                <p>Have a question? we are here to assist you</p>
                <div className="faq_input">
                  <MdSearch />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Questions"
                    type="text"
                  />
                </div>
              </div>
              <div className="p-md faq_lists">
                {Faqss.length < 1 ? (
                  <NoData value={"No Result"} />
                ) : (
                  Faqss.map((data, i) => (
                    <div key={i} className="faq_list_one">
                      <strong>{data.question}</strong>
                      <p>{data.answer}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
