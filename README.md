# sn00t

a network packer sniffer and analyzer

# LEARNINGS

pcap-ng > pcap :

- pcap-ng supports capturing multiple interfaces, this is made possible by the not using a common header for packets rather storing them per packet basis. Each packet can be associated with more than one interface.
- pcap resolves timestamps down to the microseconds which might seem impressive but modern systems require higher resolutions which is possible in pcap-ng since it has variable resolution.
- meta data can be sotred in capture files using pcap-ng. Description field can store information like OS, filters etc.
- It is adopted as default file format of most stadard packet analysers like WireShark, Tshark.
