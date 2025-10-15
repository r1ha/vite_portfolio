export const metadata = {
  id: 1,
  title: "What is statistics, and why can it be useful for cybersecurity?",
  category: "Statistics",
  author: "Erwan Achat",
  studentId: "2244316",
  date: "2025",
  description: "An exploration of how statistical methods and machine learning contribute to cybersecurity through intrusion detection, malware classification, and threat analysis."
}

export default function Assignment1() {
  return (
    <article className="prose prose-neutral max-w-none">
      <div className="not-prose mb-8">
        <div className="text-xs text-neutral-500 uppercase tracking-wide mb-2">{metadata.category}</div>
        <h1 className="text-3xl font-semibold mb-4" style={{ fontFamily: '"Cormorant Garamond", serif' }}>
          {metadata.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-neutral-600">
          <span>By {metadata.author}</span>
          <span>•</span>
          <span>{metadata.date}</span>
          <span>•</span>
          <span>Student ID: {metadata.studentId}</span>
        </div>
      </div>

      <p className="mb-6">
        Statistics is the study of data through collection and analysis. It is used to make data understandable and to predict a social or scientific phenomenon that we understand, amongst many things. Statistics is indeed used in sociology, biology and engineering. It is a mathematical science since the foundations of statistics rely on probability theory.
      </p>
      <p className="mb-6">
        In general, applied statistics start with the observation of a collection of objects or living beings that we call a population. We can extract data from their properties and interpret the data. However, it is usually impossible to get data from the entire population without exception. For instance, it would be impractical to ask every human on Earth if they got infected by Covid or not. This is why we take smaller samples that we can assess to be representative of the population. Furthermore, we also have to consider that we can make errors while collecting data.
      </p>
      <p className="mb-6">
        Through my research, I’ve learned we usually separate Statistics into two underlying domains.
      </p>
      <div className="p-6 rounded-lg my-6">
        <p className="mb-2"><strong>Descriptive Statistics:</strong> deal with summarizing data (mean, variance, etc.) to facilitate data representation and understanding.</p>
        
        <p className="mb-0"><strong>Inferential Statistics:</strong> focus on making predictions or decisions based on samples, with a determined level of confidence.</p>
      </div>
      <p className="mb-6">
        So, how can we use this science for cybersecurity?
      </p>
      <p className="mb-6">
        I tried to think about it by myself and the only thing I could come up with was that we could use traffic data to see which sites are vulnerable to attack by overload. And I also read that statistics could be used in cryptography.
      </p>
      <p className="mb-6">
        After some research to get a better understanding of this connection between statistics and cybersecurity, I found that we use statistical models to classify events as normal or malicious in order to improve intrusion detection systems.
      </p>
      <p className="mb-6">
        Moreover, Machine learning models rely on statistics principles and they are used a lot to make efficient tools such as spam filters or malware detection. Indeed, we extract features from data that is going to be analyzed and we also use statistics to evaluate the model (mean squared error, accuracy, and many other standard indicators).
      </p>
      <p className="mb-6">
        I personally follow Biometric Systems so this course will be very beneficial for me. And hopefully, I will get insights that will help me with the probabilities in the Quantum Computing course.
      </p>
      <p className="mb-0">
        To conclude, statistics can help to predict and understand, but also detect automatically in an efficient way, cybersecurity threats.
      </p>

    </article>
  )
}