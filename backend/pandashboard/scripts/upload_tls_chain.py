from get_certificate_chain.download import SSLCertificateChainDownloader

args = {"url": "www.google.com"}

downloader = SSLCertificateChainDownloader()
downloader.run(args)
