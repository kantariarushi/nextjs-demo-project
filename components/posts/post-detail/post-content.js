import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import PostHeader from './post-header';
import classes from './post-content.module.css';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('css', css);

function PostContent(props) {
  const { post } = props;

  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customComponents = {
    img({ src, alt }) {
      return (
        <Image
          src={`/images/posts/${post.slug}/${src}`}
          alt={alt}
          width={600}
          height={300}
        />
      );
    },
    p({ node, children }) {
      if (node.children[0]?.tagName === 'img') {
        const image = node.children[0];
        return (
          <div className={classes.image}>
            <Image
              src={`/images/posts/${post.slug}/${image.properties.src}`}
              alt={image.properties.alt}
              width={600}
              height={300}
            />
          </div>
        );
      }

      return <p>{children}</p>;
    },
    code({ inline, className, children }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter style={atomDark} language={match[1]} PreTag="div">
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className}>{children}</code>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customComponents}>
        {post.content}
      </ReactMarkdown>
    </article>
  );
}

export default PostContent;
