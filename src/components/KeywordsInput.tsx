import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

interface PropsKeywordsInput {
    keywords: string[],
    onChangeKeywords: (keywords: string[]) => void
}

function KeywordsInput({ keywords, onChangeKeywords }: PropsKeywordsInput) {

    const [keyword, setKeyword] = useState("");

    function onChangeKeyword(e: React.ChangeEvent<HTMLInputElement>) {
        setKeyword(e.target.value);
      }
    
      function handleAddKeyword() {
        onChangeKeywords([...keywords, keyword]);
        setKeyword("");
      }
    
      function handleDeleteKeyword(e: React.MouseEvent<SVGSVGElement>) {
        let keywordToDelete = e.currentTarget.id;
        onChangeKeywords(keywords.filter((keyword) => keyword !== keywordToDelete));
      }

    return(
        <>
            <input type="text" placeholder="Add keywords" name="keyword" value={keyword} onChange={onChangeKeyword} id="title_input" />
            {keyword !== "" ? <FontAwesomeIcon className="addKeyword" icon={faCirclePlus} size="2x" onClick={handleAddKeyword} /> : <></>}
            <div className='keywordsList'>
                {keywords.map((keyword) => {
                    return(
                        <li key={keyword} className="tag">
                            <span className="keywordLabel">{keyword}</span>
                            <FontAwesomeIcon id={keyword} className="keywordDelete" icon={faXmark} size="1x" onClick={handleDeleteKeyword} />
                        </li>
                    )})
                }
            </div>
        </>
    );
}

export default KeywordsInput;