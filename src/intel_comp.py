import gensim.downloader as api
print("downloading")
fasttext_model300 = api.load('fasttext-wiki-news-subwords-300')
print("downloaded")
import numpy as np
import os
def get_vects(questions):
    list_of_vectors=[]
    model = dict()
    #iterate through the questions and make them a list of words
    for i in range(len(questions)):
        #print(questions[i],"\n") #print each question
        list_of_words = questions[i].split(" ")
        list_of_vectors=[]
        #iterate through each word and get the vector
        if(len(list_of_words)>0):
            for j in list_of_words:
                if j in fasttext_model300.wv.vocab:
                    list_of_vectors.append(fasttext_model300.wv.word_vec(j))
            two_dim = np.vstack(tuple(list_of_vectors))
            #get mean across cols
            """filename = "Documents/WT2/w2voutput.txt"
            if os.path.exists(filename):
                append = 'a'
            else:
                append = 'w'
            with open(filename, append) as fp:
                fp.write(str(questions[i])+str(" ")+str(np.mean(two_dim, axis = 0))+str("\n"))"""
            model[questions[i]] = np.mean(two_dim, axis = 0)
    return model

def cosine_similarity(model,q1,model1,question):
	a = model[q1]
	b = model1[question]
	from scipy import spatial
	res = 1-spatial.distance.cosine(a,b)
	print(a," ",b," ",res,"\n")
	return res

def find_suggestion(question):
	filename = "questions.txt"
	file = open(filename,"r")
	all_qs=[]
	for line in file:
		line1 = line.strip()
		all_qs.append(line1)
	print(all_qs)
	quest =[]
	quest.append(question)
	model = get_vects(all_qs)
	model1 = get_vects(quest)
	maxi=0
	for i in model:
		similarity = cosine_similarity(model,i,model1,question)
		if(similarity> maxi and similarity<1): #not same question
			maxi = similarity
			return_q = i
	return return_q
